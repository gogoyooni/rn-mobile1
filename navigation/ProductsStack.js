import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/Products";
import ProductDetails from "../screens/ProductDetails";
import CartModal from "../screens/CartModal";
import { useNavigation } from "@react-navigation/native";
import useCartStore from "../state/cartStore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ProductsStack = createNativeStackNavigator();

const ProductsStackNav = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1FE687",
        },
        headerTintColor: "#141414",
        headerRight: () => <CartButton />,
      }}
    >
      <ProductsStack.Screen
        name="Products"
        component={Products}
        options={{ headerTitle: "Yooni Shop" }}
      />
      <ProductsStack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerTitle: "" }}
      />
      <ProductsStack.Screen
        name="CartModal"
        component={CartModal}
        options={{ headerShown: false, presentation: "modal" }}
      />
    </ProductsStack.Navigator>
  );
};

const CartButton = () => {
  const navigation = useNavigation();
  const { products } = useCartStore((state) => ({
    products: state.products,
  }));

  const [count, setCount] = useState(0);

  useEffect(() => {
    const count = products.reduce((acc, p) => acc + p.quantity, 0);
    setCount(count)
    console.log("count inside products", count)
  }, [products])

  return (
    <TouchableOpacity onPress={() => navigation.navigate("CartModal")}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <Ionicons name="cart" size={28} color="#000"/>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  countContainer : {
    position :"absolute",
    zIndex: 1,
    bottom: 13,
    left: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },  
  countText : {
    fontSize: 12,
    fontWeight: "bold"
  }
})

export default ProductsStackNav;
