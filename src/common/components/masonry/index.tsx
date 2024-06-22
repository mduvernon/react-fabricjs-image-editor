// React
import { FC, memo, useMemo } from "react"
// Styles
import './style.scss';

type OwnProps = {
    className?: string
    data: Array<any>
    columnCount: number
    render: (props: any, index: number) => JSX.Element
}

const MasonryComponent: FC<OwnProps> = ({
    className = '',
    columnCount,
    data,
    render,
}) => {

    const _divideArray = (array: Array<any>, length: number): Array<Array<any>> => {
        const newArray = [...array]
        const divideRes = Math.floor(newArray.length / length)

        let results: Array<Array<any>> = []

        for (let i = 0; i < length; i++) {
            results.push(newArray.splice(0, divideRes))
        }

        for (let i = 0; i < newArray.length; i++) {
            results[i].push(newArray[i])
        }

        results = results.filter(
            itm => itm.length
        )

        return results
    }

    const _calculColumnWidth = (columnCount: number) => {
        return (100 / columnCount)
    }

    const MasonryItem = useMemo(() => {
        const columnsArray = _divideArray(data, columnCount)
        const columnWidth = _calculColumnWidth(columnCount)

        return (
            <div className={`rde-editor__masonry-container ${className}-masonry-container`}>
                {columnsArray?.map((columnArray, i) => (
                    <div
                        className={'rde-editor__masonry-column'}
                        style={{ flex: `0 0 ${columnWidth}%` }}
                        key={i}
                    >
                        {columnArray?.map((props, index: number) => (
                            <div
                                className={'rde-editor__masonry-item'}
                                key={index}
                            >
                                {render(props, index)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }, [data, columnCount])

    return MasonryItem;
}

const Masonry = memo(MasonryComponent)

export { Masonry }
