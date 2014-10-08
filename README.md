jquery-preview-img
===================
It is a image preview jquery plugin.

##Usage
1. include the supplied js file in your html.
	<pre>
	&lt;script src="jquery.preview.img.js"&gt;&lt;/script&gt;
	</pre>

2. include the supplied CSS file (or create your own).
	<pre> &lt;link rel="stylesheet" href="jquery.preview.img.css" media="screen"/&gt;</pre>




##Configuration

you should provide some data to complete.

####1. if you add the html code by yourself, you can use it like:

<pre>
$(document).ready(function() {
    $('.view-image-fs').previewImg({
        showBtn: $('input[type=button]'),
        haveHtml: true,
        imgCheckedBorderColor: "#d73300",
    });
});

</pre>

showBtn: it is a button which Used to open the preview image.if use className, you should use like: ".className", if use id,you should use like: "#id".

####2. if you don't add the html code, you should use it like:

<pre> 
$(document).ready(function() {
    $('.view-image-fs').previewImg({
        imgArr: [{
           name: image Name,
           url: image url
        },{
           name: image Name,
           url: image url
        }],
        showBtn: $('input[type=button]'),
        haveHtml: false,
        imgCheckedBorderColor: "#d73300"
    });
});
</pre>
