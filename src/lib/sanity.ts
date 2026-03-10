import { createClient } from "@sanity/client";
export const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||"placeholder", dataset:"production", apiVersion:"2024-01-01", useCdn:true });
export const allPostsQuery=`*[_type=="post"]|order(publishedAt desc){_id,title,slug,publishedAt,excerpt,coverImage,"readTime":round(length(pt::text(body))/5/200)}`;
export const postBySlugQuery=`*[_type=="post"&&slug.current==$slug][0]{_id,title,slug,publishedAt,body,coverImage}`;
export const allProductsQuery=`*[_type=="product"]|order(_createdAt desc){_id,title,price,coverImage,description,externalLink}`;
