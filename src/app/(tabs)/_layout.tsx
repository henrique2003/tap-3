import { AnimatedTabBar } from '@/src/components';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#1F1F25',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused }) => {
          const color = focused ? '#ffffff' : '#ffffff77'

          if (route.name === 'configs') {
            return <MaterialIcons name="remove-shopping-cart" size={28} color={color} />
            // return <Entypo name="cog" size={28} color={color} />
          } else if (route.name === 'game') {
            return <MaterialCommunityIcons name="sword-cross" size={28} color={color} />
          } else if (route.name === 'tier-list') {
            return <FontAwesome5 name="award" size={28} color={color} />
          }
        }
      })}
    >
      <Tabs.Screen
        name="configs"
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <TouchableOpacity style={props.style} disabled>
              <View style={{ opacity: 0.5 }}>{props.children}</View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen name="game" options={{ headerShown: false }} />
      <Tabs.Screen name="tier-list" options={{ headerShown: false }} />
    </Tabs>
  )
}
