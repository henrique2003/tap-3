import { AntDesign, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { GameCell } from "../game-cell/game-cell";
import { GameRulesModal } from "../game-rules-modal/game-rules-modal";
import { useGameBoard } from "./hook";
import { GameBoardProps } from "./props";

export const GameBoard: React.FC<GameBoardProps> = (props) => {
  const {
    movesUntilDrop,
    board,
    dropPiece,
    showRules,
    handleChangeShowRules
  } = useGameBoard(props);

  return (
    <SafeAreaView className="flex-1 bg-default-primary">
      <View className="flex-row items-center justify-between px-8 py-3 border-b border-neutral-700 w-full">
        <View className="flex-row items-center justify-start gap-3">
          <View
            className={`w-10 h-10 rounded-md ${board.player1 === board.currentPlayer ? "opacity-100 scale-110" : "opacity-40"} ${board.player1.color}`}
          />
          <Text className="text-white text-xl font-bold">
            {board.player1.wins}
          </Text>
        </View>
        <Text className="text-white text-xl font-bold">
          Drop em: {movesUntilDrop}
        </Text>
        <View className="flex-row items-center justify-start gap-3">
          <Text className="text-white text-xl font-bold">
            {board.player2.wins}
          </Text>
          <View
            className={`w-10 h-10 rounded-md ${board.player2 === board.currentPlayer ? "opacity-100 scale-110" : "opacity-40"} ${board.player2.color}`}
          />
        </View>
      </View>

      <View className="flex-1 items-center justify-center">
        <View className="flex-row items-end justify-center">
          <View className="w-4 h-52 bg-orange-500 rounded-t-md mr-1" />

          <View className="bg-blue-800 p-2 rounded-xl shadow-lg shadow-blue-900">
            {board.cells.map((row, rowIndex) => (
              <View key={rowIndex} className="flex-row">
                {row.map((cell, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    onPress={async () => await dropPiece(colIndex)}
                    activeOpacity={0.8}
                  >
                    <GameCell value={cell} />
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <View className="w-4 h-52 bg-orange-500 rounded-t-md ml-1" />
        </View>
      </View>

      <View className="flex-row justify-between items-center w-full pb-2">
        <TouchableOpacity onPress={() => router.back()} className="p-1 opacity-80">
          <Entypo name="arrow-with-circle-left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeShowRules(true)} className="p-1 opacity-80">
          <AntDesign name="questioncircleo" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <GameRulesModal forceShow={showRules} onClose={() => handleChangeShowRules(false)} />
    </SafeAreaView>
  );
};
