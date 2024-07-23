interface RefreshIconProps {
    height?: number,
    width?: number,
    color?: string
}

function RefreshIcon({ height = 24, width = 24, color = "#e8eaed" }: RefreshIconProps) {
    return (
        <svg height={`${height}px`} width={`${width}px`} fill={color} viewBox="0 -960 960 960" >
            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
        </svg>
    );
}

export default RefreshIcon;