import React from "react";
import { Card, CardItem, Thumbnail, Text, Left, Body } from "native-base";
import { SingleCategory } from "../../reducers/category";

type CategoryProps = {
  category: SingleCategory;
};
export default (props: CategoryProps) => {
  return (
    <Card style={{ flex: 0 }}>
      <CardItem>
        <Left>
          <Thumbnail source={{ uri: "Image URL" }} />
          <Body>
            <Text>{props.category.name}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Body>
          <Text> {props.category.total}</Text>
        </Body>
      </CardItem>
    </Card>
  );
};
