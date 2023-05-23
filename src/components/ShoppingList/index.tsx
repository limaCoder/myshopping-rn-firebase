import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  // get docs
  /* useEffect(() => {
    firestore()
      .collection("products")
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setProducts(data);
      });
  }, []); */

  // get a unique doc
  /* useEffect(() => {
    firestore()
      .collection("products")
      .doc('DK5FhlMT8ZKjRSpcrIJO')
      .get()
      .then((response) => console.log({
        id: response.id,
        ...response.data()
      }));
  }, []); */

  // realtime
  useEffect(() => {
    const subscribe = firestore()
      .collection("products")
      // filter query
      /* .where("quantity", "==", 2) */
      // limit query
      /* .limit(2) */
      // order query
      /* .orderBy("description", "desc") */
      // query interval
      /* .orderBy("quantity")
      .startAt(3)
      .endAt(111) */
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setProducts(data);
      });

    return () => subscribe();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
