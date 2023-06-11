import Main from "./app/main";
import List from "./app/List";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ cardStyle: { backgroundColor: "#ffffff" } }}
        />
        <Stack.Screen
          name="List"
          component={List}
          options={{ cardStyle: { backgroundColor: "#ffffff" } }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
