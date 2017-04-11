//takes in the config settings and dynamically creates the banner preview page
function init(){
    var inner = document.getElementById('inner');
    var iframe = document.getElementsByTagName('iframe')[0];
    var iframe_title = document.getElementById('iframe-title');
    var dl_btn = document.getElementById('dl-btn');
    //set titles
    var title = document.getElementsByTagName('title')[0];
    var campaignTitle = document.getElementById('campaigns');
    title.innerHTML = config.title;
    campaignTitle.innerHTML = config.title;
    //create sections
    (function(){
        for(var i = 0; i < config.sections.length; i++){
            var sect = document.createElement('div');
            sect.id = config.sections[i];
            sect.className = 'section';
            sect.innerHTML = config.sections[i];
            inner.appendChild(sect);
            //and links to each section
            for(var o = 0; o < config.ad_sizes.length; o++){
                var link = document.createElement('div');
                link.id = config.ad_sizes[o] + '-' + sect.id;
                link.setAttribute('data-type', sect.id);
                link.className = 'link';
                link.innerHTML = config.ad_sizes[o];
                sect.appendChild(link);
            }
            //add space between sections
            inner.appendChild(document.createElement('br'));
        }
        //'linkify' ad size labels
        var links = document.getElementsByClassName('link');
        (function(){
            for(var i = 0; i < links.length; i++){
                links[i].addEventListener('click', function(e){
                    var size = e.target.innerHTML;
                    var lang = e.target.getAttribute('data-type');
                    iframe_title.innerHTML = e.target.id;
                    iframe.src = '../' + lang + '/' + size + '/index.html';
                    iframe.width = parseInt(size.slice(0, size.indexOf('x')) + 4);
                    iframe.height = parseInt(size.slice(size.indexOf('x') + 1, size.length) + 4);
                    if(config.download_zip_enabled === true){
                        dl_btn.style.visibility = 'visible';
                        dl_btn.style.top = parseInt(size.slice(size.indexOf('x') + 1, size.length), 10) + 15 + 'px';
                        dl_btn.innerHTML = 'Download ' + size + '.zip';
                        dl_btn.setAttribute('data-size', size);
                        dl_btn.setAttribute('data-lang', lang);
                    }
                });
            }
        })();
    })();
    dl_btn.addEventListener('click', function(){
        getZip(dl_btn.getAttribute('data-lang'), dl_btn.getAttribute('data-size'));
    });
    function getZip(lang, size){
        window.open('../../COMPRESSED/' + lang + '/' + size + '.zip');
    }
}