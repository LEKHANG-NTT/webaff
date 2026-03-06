    // img: "https:" + asset.fields.file.url

import { createClient } from "contentful";

export const client = createClient({
  space: "7k2vjqt6kt63",
  accessToken: "ul2UwpO6jqgC9bLMtdMi8c_cbu8BMqGu3wM7gi7RF78"
});


// Lấy tất cả sản phẩm
export async function getProducts() {

  const res = await client.getEntries({
    content_type: "affiliate",
    include: 2
  });

  return res.items.map(item => {

    const images = item.fields.img?.map(img => {
      const asset = res.includes.Asset.find(
        a => a.sys.id === img.sys.id
      );

      return asset ? "https:" + asset.fields.file.url : "";
    }) || [];

    return {
      id: item.sys.id,
      name: item.fields.name,
      link: item.fields.link,
      price: item.fields.price,
      priceDis: item.fields.priceDis,
      disPercent: item.fields.disPercent,
      category: item.fields.categogy,
      desc: item.fields.desc,
      img: images
    };

  });

}



// Lấy sản phẩm theo id
export async function getProductById(id) {

  const res = await client.getEntry(id, {
    include: 2
  });

  const images = res.fields.img?.map(asset => {
    return asset?.fields?.file?.url ? "https:" + asset.fields.file.url : null;
  }).filter(Boolean) || [];

  return {
    id: res.sys.id,
    name: res.fields.name,
    link: res.fields.link,
    price: res.fields.price,
    priceDis: res.fields.priceDis,
    disPercent: res.fields.disPercent,
    category: res.fields.category,
    desc: res.fields.desc,
    img: images
  };

}