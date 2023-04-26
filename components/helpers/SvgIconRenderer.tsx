import React from 'react';


interface Props {
    height?: string
    width?: string
    size?: number
    path?: string
    fill?: string
    style?: React.CSSProperties
    pathFill?: string
    className?: string
    viewBox?: string
}


const SvgIconRenderer: React.FC<Props> = (props) => {
    // const {} = useActions()
    // const {} = useAppState()
    const { width, height, path, style, fill, pathFill, className, viewBox } = props;

    return <svg className={className} style={{ width: width, height: height, ...style }} fill={fill} viewBox={viewBox}>
        <path fill={pathFill ?? "#FFF"}
            d={path} />
    </svg>
};

export default SvgIconRenderer;
