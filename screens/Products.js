import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/api";
import { Image } from "react-native";

const Products = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    load();
  }, []);

  console.log(products);


  const productsContent = ({ item }) => (
    // console.log(item.title)

    <TouchableOpacity
      style={styles.product}
      onPress={() =>
        navigation.navigate("ProductDetails", { id: item.id.toString(), image: item.image, title: item.title, price: item.price, description: item.description, category: item.category })
      }
    >
      <Image style={styles.productImage} source={{uri: item.image}}/>
      <Text style={styles.productName}>{item?.title}</Text>
      <Text style={styles.productPrice}>${item?.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={productsContent}
        keyExtractor={(item) => item.id}
        numColumns={2}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  product: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#fff"

  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain"

  },
  productName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold"
  },
  productPrice: {
    marginTop: 4,
    fontsize: 14,
    color: "#666",
  }
});

export default Products;
