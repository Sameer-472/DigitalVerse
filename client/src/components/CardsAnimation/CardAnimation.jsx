import React from "react";
import { Card1, Card2, Card3, Flex, Image1, Image2, Image3,SpanText,ChoiceText } from "./style";


export const CardAnimation = () => {
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "40rem",
            justifyContent: "center",
          }}
        >
          <Card1>
            {/* <Image1 src="assets/card1.jfif" alt='Card1' /> */}
            <Image1 src="https://media3.giphy.com/media/12IiJKJ7yNZY8GXQ6B/giphy.gif?cid=ecf05e47bn1px9wa521d3lwa7hd7rp4br6v7c3rjuu83mm1w&rid=giphy.gif&ct=g" alt='Card1' />
          </Card1>
          <Card2>
            {/* <Image2 src="assets/card2.png" alt='Card2' /> */}
            <Image2 src="https://media4.giphy.com/media/wR8srJu54JVxv2PlfF/giphy.gif?cid=ecf05e47t9s830i2fiqv5qxumlbc93rkxwa0taeoq0znrxiu&rid=giphy.gif&ct=g" alt='Card2' />
          </Card2>
          <Card3  top='200px'>
            {/* <Image3 src="assets/card3.jfif" alt='Card3' width={247} height={438} /> */}
            <Image3 src="https://media3.giphy.com/media/1GkRWmlZzcE3HLDXQw/giphy.gif?cid=ecf05e47kw42csefw8w8600r36q5vaoyqmrs9ptulj27b3lt&rid=giphy.gif&ct=g" alt='Card3' width={247} height={438} />
          </Card3>
        </div>
      </div>
    </>
  );
};