export const menuItemsQuery = `*[_type == "menuItem"] | order(_createdAt asc) {
  _id,
  name,
  "categories": category,
  description,
  image,
  rating,
  reviews
}`;

export const galleryImagesQuery = `*[_type == "galleryImage"] | order(order asc) {
  _id,
  title,
  category,
  image
}`;

export const aboutUsQuery = `*[_type == "aboutUs"][0]{
  heading,
  body,
  image,
  points
}`;

export const homeStatsQuery = `*[_type == "homeStats"][0]{
  stats
}`;

export const branchesQuery = `*[_type == "branch"] | order(order asc) {
  _id,
  name,
  address,
  phone,
  image,
  mapLink
}`;
