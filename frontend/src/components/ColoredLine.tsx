import React from "react";

interface ColoredLineProp {
    color?: string,
    marginTop?: number,
    marginBottom?: number,
}
export const ColoredLine: React.FC<ColoredLineProp> = ({ color = 'lightgray', marginTop = 5, marginBottom = 5 }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`,
        }}
    />
);