/**
 * 打印 的事件逻辑
 * @Date 2017-3-22
 */
import ol from 'openlayers';
import FileSaver from 'file-saver';
import util from '../../../common/util.jsx';

class PrintbarAction{
	print2Img(map){
		// util.getScript('../../../app/common/jslibs/fileSaver.min.js').then(()=>{
			map.once('postcompose', (event) =>{
          		var canvas = event.context.canvas;
          		if (navigator.msSaveBlob) {
           			navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
            	} else {
            		canvas.toBlob((blob) =>{
            	  		FileSaver.saveAs(blob, 'map.png');
           			});
          		}
       		});
        	map.renderSync();
		// });
	}
    print2Pdf(map,bglayer){
        util.getScript('../../../app/common/jslibs/jspdf.min.js').then(()=>{
            this._print2Pdf(map,bglayer)
        })
    }
	_print2Pdf(map,bglayer){
		let dims = {
            a0: [1189, 841],
            a1: [841, 594],
            a2: [594, 420],
            a3: [420, 297],
            a4: [297, 210],
            a5: [210, 148]
        };
        let loading = 0;
        let loaded = 0;
        // let exportButton = document.getElementById('export-pdf');
        // exportButton.disabled = true;
        document.body.style.cursor = 'progress';

        let format = document.getElementById('format').value;
        let resolution = document.getElementById('resolution').value;

        console.log(format,resolution);

        let dim = dims[format];
        let width = Math.round(dim[0] * resolution / 25.4);
        let height = Math.round(dim[1] * resolution / 25.4);
        let size = (map.getSize());
        let extent = map.getView().calculateExtent(size);
        // let bglayer = map.getLayers().item(0);
        let source = bglayer.getSource();
        let tileLoadStart = ()=> {
            ++loading;
        };

        let tileLoadEnd = function() {
            ++loaded;
            if (loading === loaded) {
                let canvas = this;
             
                window.setTimeout(function() {
                    loading = 0;
                    loaded = 0;
                    let data = canvas.toDataURL('image/png'); //canvas
                    let pdf = new jsPDF('landscape', undefined, format);
                    pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
                    pdf.save('map.pdf');
                    source.un('tileloadstart', tileLoadStart);
                    source.un('tileloadend', tileLoadEnd, canvas);
                    source.un('tileloaderror', tileLoadEnd, canvas);
                    map.setSize(size);
                    map.getView().fit(extent, size);
                    map.renderSync();
                    document.body.style.cursor = 'auto';
                }, 100);
            }
        };

        map.once('postcompose', function(event) {
            source.on('tileloadstart', tileLoadStart);
            source.on('tileloadend', tileLoadEnd, event.context.canvas);
            source.on('tileloaderror', tileLoadEnd, event.context.canvas);
        });

        map.setSize([width, height]);
        map.getView().fit(extent, (map.getSize()));
        map.renderSync();
	}
}


export default PrintbarAction;