import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import useCartStore from "../state/cartStore";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchProductDetails } from "../api/api";

const ProductDetails = ({ route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const { products, addProduct, reduceProduct } = useCartStore((state) => ({
    products: state.products,
    addProduct: state.addProduct,
    reduceProduct: state.reduceProduct,
  }));

  const [count, setCount] = useState(0);

  const fetchProduct = async () => {
    try {
      const productData = await fetchProductDetails(id);
      console.log("productData: ", productData);
      setProduct(productData);
      //   updateProductQuantity();
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const updateProductQuantity = () => {
    const result = products?.filter((p) => p.id === product?.id);
    if (result.length > 0) {
      console.log("result[0]", result[0]);
      setCount(result[0].quantity);
    } else {
      setCount(0);
    }
  };

  useLayoutEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    updateProductQuantity();
  }, [products, product]);

  console.log("products", products);

  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image style={styles.productImage} source={{ uri: product.image }} />
          <Text style={styles.productName}>{product.title}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>Price: ${product.price}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                reduceProduct(product);
              }}
            >
              <Ionicons name="remove" size={24} color={"#1FE687"} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{count}</Text>
            <TouchableOpacity style={styles.button}>
              <Ionicons
                name="add"
                size={24}
                color={"#1FE687"}
                onPress={() => {
                  addProduct(product);
                }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productImage: {
    height: 300,
    resizeMode: "contain",
    borderRadius: 8,
  },
  productCategory: {
    marginTop: 5,
    fontSize: 16,
    color: "#666",
  },
  productDescription: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  productName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },

  productPrice: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    // color: "#666",
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
    borderColor: "#1FE687",
    borderWidth: 2,
  },
  quantity: {
    fontSize: 20,
    width: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});
