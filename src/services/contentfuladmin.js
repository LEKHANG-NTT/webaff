import contentfulManagement,{createClient} from "contentful-management";

const SPACE_ID = "7k2vjqt6kt63";
const ENV = "master";

const client = createClient({
  accessToken: "CFPAT-s4s2w34uCNhgBQLTqo0LBFOqKSczv3GWaKXz-ZQAuN0"
});

async function getEnvironment() {
  const space = await client.getSpace(SPACE_ID);
  return await space.getEnvironment(ENV);
}

// CREATE
export async function createProduct(data) {

  const env = await getEnvironment();

  const entry = await env.createEntry("affiliate", {
    fields: {
      name: { "en-US": data.name },
      link: { "en-US": data.link || "" },
      price: { "en-US": data.price },
      priceDis: { "en-US": data.priceDis },
      disPercent: { "en-US": data.disPercent },
      categogy: { "en-US": data.category },
      desc: { "en-US": data.desc || "" },
      img: { "en-US": [] }
    }
  });

  await entry.publish();
}

// UPDATE
export async function updateProduct(id, data) {

  const env = await getEnvironment();

  const entry = await env.getEntry(id);

  entry.fields.name["en-US"] = data.name;
  entry.fields.link["en-US"] = data.link;
  entry.fields.price["en-US"] = data.price;
  entry.fields.priceDis["en-US"] = data.priceDis;
  entry.fields.disPercent["en-US"] = data.disPercent;
  entry.fields.categogy["en-US"] = data.category;
  entry.fields.desc["en-US"] = data.desc;

  const updated = await entry.update();
  await updated.publish();
}

// DELETE
export async function deleteProduct(id) {

  const env = await getEnvironment();

  const entry = await env.getEntry(id);

  try {
    await entry.unpublish();
  } catch {}

  await entry.delete();
}