import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-02-01',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

//had to return a string from imageUrlBuilder to work with TS. builder.image does not return a string, so .url() does. 
//then had to type source to avoid "any" type
export const urlFor = ((source: { _ref?: string, asset?: { _ref?: string } }) => builder.image(source).url());


