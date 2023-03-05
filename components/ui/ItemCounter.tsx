import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

interface Props {
    currentValue: number
    maxValue: number
    // Methods
    updatedQuantity: (newValue: number) => void
}

export const ItemCounter = ({
    currentValue,
    maxValue,
    updatedQuantity,
}: Props) => {
    const onAdd = () => {
        if (currentValue >= maxValue) return
        updatedQuantity(currentValue + 1)
    }

    const onRemove = () => {
        if (currentValue === 1) return
        updatedQuantity(currentValue - 1)
    }

    return (
        <Box display="flex" alignItems="center">
            <IconButton onClick={onRemove}>
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: "center" }}>
                {currentValue}
            </Typography>
            <IconButton onClick={onAdd}>
                <AddCircleOutline />
            </IconButton>
        </Box>
    )
}
