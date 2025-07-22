import { TouchableOpacity, View } from "react-native"
import { GameCell } from "../index"
import { GameBoardCellProps } from "./props"

export const GameBoardCell: React.FC<GameBoardCellProps> = ({
  board,
  onDropPiece
}) => {
  return (
    <View className="flex-row items-end justify-center">
      <View className="w-4 h-52 bg-yellow-400 rounded-t-md mr-1" />

      <View className="bg-blue-800 p-2 rounded-xl shadow-lg shadow-blue-900">
        {board.cells.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row">
            {row.map((cell, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                onPress={() => onDropPiece(colIndex)}
                activeOpacity={0.8}
              >
                <GameCell value={cell} />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View className="w-4 h-52 bg-yellow-400 rounded-t-md ml-1" />
    </View>
  )
}
