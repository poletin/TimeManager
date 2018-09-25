import React from "react";
import { Card, CardItem, Text, View, Icon } from "native-base";
import { SingleCategory } from "../../reducers/category";

type CategoryProps = {
  category: SingleCategory;
};
export default (props: CategoryProps) => {
  return (
    <Card>
      <CardItem header>
        <Text style={{}}>{props.category.name}</Text>
      </CardItem>
      <View />
      <CardItem style={{ backgroundColor: "lightgrey" }}>
        <Text>Bereits gearbeitet</Text>
      </CardItem>
      <CardItem style={{ backgroundColor: "lightgrey", height: 100 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 50 }}> {props.category.total}</Text>
        </View>
      </CardItem>
      <CardItem footer style={{ justifyContent: "flex-end" }}>
        <Icon name="pie" />
        <Icon name="play" />
        <Icon name="settings" />
      </CardItem>
    </Card>
  );
};
