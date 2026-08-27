import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://dimario.dev";
    const lastModified = new Date();

    return [
        { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
        {
            url: `${baseUrl}/#work`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/#experience`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/#about`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/#contact`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}
