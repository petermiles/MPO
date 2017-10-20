"use strict";
angular.module("MPOApp").directive("backgroundImage", function() {
    return function(scope, element, attrs) {
        let height = $(document).height()

        var myImage = new Image();
        myImage.src = attrs.backgroundImage;



        console.log(myImage)

        attrs.$observe('backgroundImage', function(value) {
            element.css({
                'background-image': 'url(' + value + ')',
                'display': 'block',
                'background-size': 'cover',
                'filter': 'blur(15px)',
                'height': height,
                'position': 'fixed',
                'left': '0',
                'right': '0',
                'z-index': '-10'
            });
        });
        var pic = new Image();
        pic.crossOrigin = 'anonymous';
        pic.src = attrs.backgroundImage;

        pic.crossOrigin = 'Anonymous';

        let rgbValues = {}

        pic.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            localStorage.setItem("savedImageData", canvas.toDataURL("image/png"));
        }
        
        pic.onload = function getAverageRGB() {

            localStorage.setItem("savedImageData", canvas.toDataURL("image/png"));



            var blockSize = 5, // only visit every 5 pixels
                defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
                canvas = document.createElement('canvas'),
                context = canvas.getContext && canvas.getContext('2d'),
                data, width, height,
                i = -4,
                length,
                rgb = { r: 0, g: 0, b: 0 },
                count = 0;

            if (!context) {
                return defaultRGB;
            }

            height = canvas.height = pic.naturalHeight || pic.offsetHeight || pic.height;
            width = canvas.width = pic.naturalWidth || pic.offsetWidth || pic.width;

            context.drawImage(pic, 0, 0);

            try {
                data = context.getImageData(0, 0, width, height);
            } catch (e) {
                /* security error, img on diff domain */
                console.log(e)
                return defaultRGB;
            }

            length = data.data.length;

            while ((i += blockSize * 4) < length) {
                ++count;
                rgbValues.r += data.data[i];
                rgbValues.g += data.data[i + 1];
                rgbValues.b += data.data[i + 2];
            }

            // ~~ used to floor values
            rgb.r = ~~(rgb.r / count);
            rgb.g = ~~(rgb.g / count);
            rgb.b = ~~(rgb.b / count);
            console.log(rgb)
            return rgb;

        }
        // let averageColor =
        //     (() => {
        //         var pic = new Image();
        //         pic.src = attrs.backgroundImage;

        //         var blockSize = 5, // only visit every 5 pixels
        //             defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
        //             canvas = document.createElement('canvas'),
        //             context = canvas.getContext && canvas.getContext('2d'),
        //             data, width, height,
        //             i = -4,
        //             length,
        //             rgb = { r: 0, g: 0, b: 0 },
        //             count = 0;

        //         if (!context) {
        //             return defaultRGB;
        //         }

        //         height = canvas.height = pic.height;
        //         width = canvas.width = pic.width;

        //         context.drawImage(pic, 0, 0);

        //         try {
        //             data = context.getImageData(0, 0, width, height);
        //         } catch (e) {
        //             return defaultRGB;
        //         }

        //         length = data.data.length;

        //         while ((i += blockSize * 4) < length) {
        //             ++count;
        //             rgb.r += data.data[i];
        //             rgb.g += data.data[i + 1];
        //             rgb.b += data.data[i + 2];
        //         }

        //         // ~~ used to floor pics
        //         rgb.r = ~~(rgb.r / count);
        //         rgb.g = ~~(rgb.g / count);
        //         rgb.b = ~~(rgb.b / count);

        //         console.log(rgb)
        //         return rgb;

        //     })();

        //     console.log(averageColor)
    };
});