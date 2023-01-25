import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { useContext } from 'react';
import { Context } from '../Context/Context';



function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function NFTTable() {
  const [NftCollection, setNftCollection] = useState([]);

  const { nft, loadNFTs, userPurchasedNFT, fetchAllItems, account, allItems } =
  useContext(Context);


  // const slice = NftCollection.slice(0, 4).reverse();
  const slice = NftCollection.slice(Math.max(NftCollection.length - 4, 1)).reverse();
  console.log(slice);


  async function loadCollections(){
    const collections = await Promise.all(
      nft.map(async (value) => {
        console.log("fetching data....");
        const data = await axios.get(value.Uri);
        const response = data.data;
        console.log("sucssessfully fecthed data.");
        const price = ethers.utils.formatUnits(value.price.toString() , 'ether')
        const listedItem = await {
          id: value.tokenId.toNumber(),
          name: response.name,
          description: response.description,
          image: response.image,
          seller: value.seller,
          owner: value.owner,
          sold: value.sold,
          price
        };
        return listedItem;
      })
    );
    setNftCollection(collections);
    console.log(NftCollection)
  }

  // loadCollections();
  return (
    <TableContainer >
      <Table sx={{ minWidth: 450 , backgroundColor: 'transparent' , color: 'white'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NFT</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
            {/* <TableRow
             
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
            <img src="https://i.seadn.io/gcs/files/4856a3a1041d9591c60b8d8d8c212a3d.png?auto=format&w=1920" width={100} height={100} alt="" />
              </TableCell>
              <TableCell align="right"> address </TableCell>
              <TableCell align="right">1.5</TableCell>
            </TableRow> */}

            {
              slice.map((item , index)=>(
                <TableRow
             
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
              <img src={item.image} width={100} height={100} alt="" />
                </TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
              </TableRow>
              ))
            }
    
        </TableBody>
      </Table>
    </TableContainer>
  );
}