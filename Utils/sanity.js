import { createCurrentUserHook, createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

// lib/config.js
export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: 'v1',
  useCdn: process.env.NODE_ENV === 'production',
}

//Set client for fetch Data.
export const sanityClient = createClient(config)

//helperFunction to fetch image URL.
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

//Use current logged in user Account
export const useCurrentUser = createCurrentUserHook(config)

//Use Server side render to fetch.
