"use strict";
angular.module("MPOApp").directive("fabButton", hideImage);


function hideImage() {
    var directive = {
        link: link,
        restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {

    	const transitionTime = 0.3;

        $(document).on('click', (element) => {
            const button = document.querySelector('.action-button.is-open');
            if (button) closeActions(button);
        });

        $('.action-button').on('click', (e) => {
            e.stopPropagation();
            const target = e.currentTarget;
            if ($(target).hasClass('is-open')) return;

            openActions(target);
        });


        function closeActions(button) {
            const list = button.querySelector('.action-list');
            const dimensions = {
                width: list.clientWidth,
                height: list.clientHeight
            }

            button.classList.remove('is-open');

            requestAnimationFrame(morphList);

            function moveButton() {
                const buttonPosition = 0;

                list.style.transition = 'margin-right ' + transitionTime / 2 + 's ease';
                button.style.transition = 'margin-right ' + transitionTime / 2 + 's ease';

                list.style.marginRight = '';
                button.style.marginRight = '';
            }

            function morphList() {
                const buttonPosition = (dimensions.width / 2) - 30;

                button.style.transition = 'all ' + transitionTime + 's ease';
                list.style.transition = 'all ' + transitionTime + 's ease';

                button.style.marginRight = buttonPosition + 'px';
                list.style.marginRight = -buttonPosition + 'px';

                button.style.width = '';
                button.style.height = '';
                button.style.borderRadius = '';
                button.style.backgroundColor = '';

                list.style.opacity = '';

                $(list).one('transitionend', moveButton);
            }
        }

        function openActions(button) {
            const list = button.querySelector('.action-list');
            const dimensions = {
                width: list.clientWidth,
                height: list.clientHeight
            }

            button.classList.add('is-open');

            requestAnimationFrame(moveButton);

            function moveButton() {
                const buttonPosition = (dimensions.width / 2) - 30;

                list.style.transition = 'margin-right ' + transitionTime / 2 + 's ease';
                button.style.transition = 'margin-right ' + transitionTime / 2 + 's ease';

                list.style.marginRight = -buttonPosition + 'px';
                button.style.marginRight = buttonPosition + 'px';

                $(button).one('transitionend', morphButton);
            }

            function morphButton() {
                button.style.transition = 'all ' + transitionTime + 's ease';
                list.style.transition = 'all ' + transitionTime + 's ease';

                button.style.marginRight = '0px';
                list.style.marginRight = '0px';

                button.style.width = dimensions.width + 'px';
                button.style.height = dimensions.height + 'px';
                button.style.borderRadius = '0';
                button.style.backgroundColor = 'rgba(255, 152, 0, 0)';

                list.style.opacity = '1';
            }
        }
    }
}