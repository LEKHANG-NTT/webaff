import { createClient } from "contentful";

export const client = createClient({
  space: "7k2vjqt6kt63",
  accessToken: "ul2UwpO6jqgC9bLMtdMi8c_cbu8BMqGu3wM7gi7RF78"
});

export async function getProducts() {
  const res = await client.getEntries({
    content_type: "affiliate"
  });

  return res.items.map(item => {
    const imgId = item.fields.img[0].sys.id;
    const asset = res.includes.Asset.find(a => a.sys.id === imgId);

    return {
      id: item.sys.id,
      name: item.fields.name,
      link: item.fields.link,
      price: item.fields.price,
      priceDis: item.fields.priceDis,
      disPercent: item.fields.disPercent,
      category: item.fields.categogy,
      desc: item.fields.desc,
      img: "https:" + asset.fields.file.url
    };
  });
}