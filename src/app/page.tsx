'use client'

import Image from "next/image";
import { Button } from "antd";
import { use, useEffect } from "react";
import api from "@/services/api";

async function getHeroes(){
  try{
    const response = await api.get('/characters', {
      params: {
        ts: 1,
        apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
        hash: process.env.NEXT_PUBLIC_HASH,
      }
    });
    console.log(response.data.data.results);
  }catch(error){
    console.log(error);
  }
}

export default function Home() {

  useEffect(() => {
    getHeroes();
  }, []);
  
  return (  
    <Button type="primary">botão</Button>
  );
}
