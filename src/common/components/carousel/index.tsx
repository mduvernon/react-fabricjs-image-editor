// React
import { Children, useRef, useState, useEffect, FC } from 'react';
// Components
import { Masonry } from '../masonry';
// Common Utils
import { getScrollOffset, debounce } from 'common/utils';
// Common Hooks
import { useResizeObserver } from 'common/hooks';
// Styles
import './style.scss';

type OwnProps = {
    style?: any;
    children: any;
    className: string;
};

const Carousel: FC<OwnProps> = ({
    className = '',
    style = null,
    children,
}) => {

    const [isPrevArrowShown, setIsPrevArrowShown] = useState(false);
    const [isNextArrowShown, setIsNextArrowShown] = useState(false);

    const scrollingByDraggingLatestXRef$: any = useRef(false);
    const carouselRef$: any = useRef(null);

    const [observeResize] = useResizeObserver();

    const childrenArray = Children.toArray(children);

    const _updateArrowsVisibility = () => {
        if (!carouselRef$.current) {
            return;
        }

        const { scrollWidth, offsetWidth, scrollLeft } = carouselRef$.current;
        const scrollableWidth = Math.round(scrollWidth - offsetWidth);
        const scrollRight = Math.round(scrollableWidth - scrollLeft);
        setIsPrevArrowShown(scrollLeft > 0);
        setIsNextArrowShown(scrollRight > 0);
    };

    const _scrollCarouselToElement = (foundElements: any, direction: any) => {
        const liIndex = foundElements.findIndex((element: any) =>
            element.classList.contains('rde-editor__carousel-item'),
        );

        if (liIndex == -1) {
            return;
        }

        foundElements[liIndex].scrollIntoView({
            inline: direction,
            behavior: 'smooth',
            block: 'nearest',
        });

        // setTimeout cuz we're not sure when the smooth scroll will 
        // be finished, we're waiting for 0.5s to start checking.
        setTimeout(() => {
            _updateArrowsVisibility();
        }, 500);
    };

    const _scrollToPrev = (event: any) => {
        const { topOffset, leftOffset } = getScrollOffset();
        const currentElements = document.elementsFromPoint(
            event.pageX + event.currentTarget.offsetWidth - leftOffset,
            event.pageY - topOffset,
        );
        _scrollCarouselToElement(currentElements, 'end');
    };

    const _scrollToNext = (event: any) => {
        const { topOffset, leftOffset } = getScrollOffset();

        const currentElements = document.elementsFromPoint(
            event.pageX - event.currentTarget.offsetWidth - leftOffset,
            event.pageY - topOffset,
        );

        _scrollCarouselToElement(currentElements, 'start');
    };

    const _scrollByDragging = (event: any) => {
        if (!scrollingByDraggingLatestXRef$.current || !carouselRef$.current) {
            return;
        }

        const currentX = (event.touches?.[0] || event).pageX;

        carouselRef$.current.scrollBy(
            scrollingByDraggingLatestXRef$.current - currentX,
            0,
        );

        scrollingByDraggingLatestXRef$.current = currentX;
        debounce(_updateArrowsVisibility, 30)();
    };

    const _stopScrollByDragging = () => {
        scrollingByDraggingLatestXRef$.current = null;

        document.removeEventListener('mousemove', _scrollByDragging);
        document.removeEventListener('mouseup', _stopScrollByDragging);
        document.removeEventListener('touchmove', _scrollByDragging);
        document.removeEventListener('touchcancel', _stopScrollByDragging);
        document.removeEventListener('touchend', _stopScrollByDragging);
    };

    const _startScrollByDragging = (event: any) => {
        scrollingByDraggingLatestXRef$.current = (event.touches?.[0] || event).pageX;

        document.addEventListener('mousemove', _scrollByDragging);
        document.addEventListener('mouseup', _stopScrollByDragging);
        document.addEventListener('touchmove', _scrollByDragging);
        document.addEventListener('touchcancel', _stopScrollByDragging);
        document.addEventListener('touchend', _stopScrollByDragging);
    };

    useEffect(() => {
        if (carouselRef$.current) {
            observeResize(carouselRef$.current, _updateArrowsVisibility);
        }
    }, []);

    return (
        <div
            className={`rde-editor__carousel-container ${className}`}
            onTouchStart={_startScrollByDragging}
            onMouseDown={_startScrollByDragging}
            style={style}
        >
            {(isPrevArrowShown) && (
                <div
                    className="rde-editor__carousel-prev-button"
                    onClick={_scrollToPrev}
                >
                    <i className="fas fa-chevron-left"></i>
                </div>
            )}
            <div className={`rde-editor__carousel-items ${className}-carousel-items`} ref={carouselRef$}>
                <Masonry
                    className={`${className}-carousel-items-masonry`}
                    data={childrenArray}
                    columnCount={2}
                    render={(child: any, index: number) => (
                        <div
                            className={`rde-editor__carousel-item ${className}-carousel-item`}
                            key={index}
                        >
                            {child}
                        </div>
                    )}
                />
            </div>
            {(isNextArrowShown) && (
                <div
                    className="rde-editor__carousel-next-button"
                    onClick={_scrollToNext}
                >
                    <i className="fas fa-chevron-right"></i>
                </div>
            )}
        </div>
    );
};

export { Carousel }

export default Carousel;
