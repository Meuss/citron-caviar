import { v2 as cloudinary } from 'cloudinary';

/**
 * Lists the portfolio projects and their images for the /realisations page.
 *
 * Source of truth is Cloudinary: one sub-folder per project under `realisations/`
 * (e.g. `realisations/BCF`). The folder name becomes the filter button label; an
 * optional numeric prefix (`01 BCF`) controls ordering and is stripped for display.
 *
 * Cached ~60s (SWR) so we stay well under Cloudinary's Admin API rate limit and are
 * cheap on Netlify's free functions — client uploads surface within about a minute.
 *
 * When Cloudinary isn't configured yet (no env vars), it falls back to the local
 * `/public/images/realisations` images so the page/layout is fully testable in dev.
 */

const ROOT_FOLDER = 'realisations';

export interface RealisationImage {
    publicId?: string; // Cloudinary public id (delivered via the cloudinary provider)
    url?: string; // local/public path (dev fallback, default provider)
    width?: number;
    height?: number;
}

export interface RealisationProject {
    slug: string;
    label: string;
    order: number;
    images: RealisationImage[];
}

export interface RealisationsResponse {
    source: 'cloudinary' | 'local';
    projects: RealisationProject[];
}

/** "01 BCF" -> { order: 1, label: "BCF" }; "REDBULL" -> { order: Infinity, label: "REDBULL" }. */
function parseFolderName(name: string): { order: number; label: string } {
    const match = name.match(/^(\d+)[\s\-_.]*(.+)$/);
    if (match) return { order: Number(match[1]), label: (match[2] ?? name).trim().toUpperCase() };
    return { order: Number.MAX_SAFE_INTEGER, label: name.trim().toUpperCase() };
}

function slugify(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

async function fromCloudinary(): Promise<RealisationProject[]> {
    // List the project sub-folders (each becomes a filter button).
    const { folders } = (await cloudinary.api.sub_folders(ROOT_FOLDER)) as {
        folders: { name: string; path: string }[];
    };

    // One search for every image under the root, then group by folder in code.
    const { resources } = (await cloudinary.search
        .expression(`folder:${ROOT_FOLDER}/*`)
        .max_results(200)
        .execute()) as {
        resources: {
            public_id: string;
            asset_folder?: string;
            filename?: string;
            display_name?: string;
            width: number;
            height: number;
        }[];
    };

    const folderOf = (r: { public_id: string; asset_folder?: string }) =>
        r.asset_folder || r.public_id.split('/').slice(0, -1).join('/');

    // Cloudinary's public_id isn't necessarily the visible filename, so sort by the
    // actual filename (numeric-aware, so "1, 2, … 10" order rather than "1, 10, 2").
    const nameKey = (r: { filename?: string; display_name?: string; public_id: string }) =>
        r.filename || r.display_name || r.public_id.split('/').pop() || '';

    return folders
        .map((folder) => {
            const { order, label } = parseFolderName(folder.name);
            const images = resources
                .filter((r) => folderOf(r) === folder.path)
                .sort((a, b) => nameKey(a).localeCompare(nameKey(b), undefined, { numeric: true, sensitivity: 'base' }))
                .map((r) => ({ publicId: r.public_id, width: r.width, height: r.height }));
            return { slug: slugify(folder.name), label, order, images };
        })
        .filter((p) => p.images.length > 0)
        .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
}

/**
 * Dev fallback built from the existing local images so the layout is testable now.
 * Real dimensions are included so orientation (portrait vs full-width landscape)
 * works, and counts vary (6 / 4 / 10) to exercise the flexible layout.
 */
function fromLocal(): RealisationProject[] {
    // path -> [width, height]
    const L = (path: string, width: number, height: number): RealisationImage => ({
        url: `/images/realisations/${path}`,
        width,
        height,
    });
    return [
        {
            slug: 'bcf',
            label: 'BCF', // 6 images, last one landscape (full width)
            order: 1,
            images: [
                L('col_2/1_bcf_1.jpg', 2058, 3087),
                L('col_4/3_bcf_1.jpg', 2007, 3010),
                L('col_2/2_bumotec_1.jpg', 2058, 2744),
                L('col_2/3_redbull_1.jpg', 2058, 3086),
                L('col_2/4_cremo_1.jpg', 2058, 3093),
                L('col_1/5_bcf_1.jpg', 2017, 1345), // landscape
            ],
        },
        {
            slug: 'redbull',
            label: 'REDBULL', // 4 images, last one landscape
            order: 2,
            images: [
                L('col_4/2_redbull_1.jpg', 2007, 3010),
                L('col_2/3_redbull_1.jpg', 2058, 3086),
                L('col_4/1_garage_1.jpg', 2007, 3011),
                L('col_3/1_gesa_1.jpg', 2016, 1344), // landscape
            ],
        },
        {
            slug: 'gesa',
            label: 'GESA', // 10 images, two landscapes interspersed
            order: 3,
            images: [
                L('col_1/2_gesa_1.jpg', 2017, 3024),
                L('col_1/4_gesa_1.jpg', 2017, 3024),
                L('col_3/2_pink_1.jpg', 2016, 3024),
                L('col_3/4_bcf_1.jpg', 2016, 1344), // landscape
                L('col_2/2_bumotec_1.jpg', 2058, 2744),
                L('col_4/4_chantier_1.jpg', 2007, 3011),
                L('col_3/5_cremo_1.jpg', 2016, 1341), // landscape
                L('col_1/1_pink_1.jpg', 2017, 3026),
                L('col_4/2_redbull_1.jpg', 2007, 3010),
                L('col_2/5_pink_1.jpg', 2058, 3087),
            ],
        },
        {
            slug: 'prive',
            label: 'PRIVÉ', // 6 images, last one landscape
            order: 4,
            images: [
                L('col_1/1_pink_1.jpg', 2017, 3026),
                L('col_2/5_pink_1.jpg', 2058, 3087),
                L('col_3/2_pink_1.jpg', 2016, 3024),
                L('col_1/3_cremo_1.jpg', 2016, 2687),
                L('col_3/5_mariage_2.jpg', 2016, 2688),
                L('col_3/5_cremo_1.jpg', 2016, 1341), // landscape
            ],
        },
    ];
}

export default defineCachedEventHandler(
    async (): Promise<RealisationsResponse> => {
        const config = useRuntimeConfig();
        const cloudName = config.public.cloudinaryCloudName;

        if (!cloudName || !config.cloudinaryApiKey || !config.cloudinaryApiSecret) {
            return { source: 'local', projects: fromLocal() };
        }

        cloudinary.config({
            cloud_name: cloudName,
            api_key: config.cloudinaryApiKey,
            api_secret: config.cloudinaryApiSecret,
            secure: true,
        });

        try {
            return { source: 'cloudinary', projects: await fromCloudinary() };
        } catch (error) {
            console.error('[realisations] Cloudinary fetch failed:', error);
            return { source: 'cloudinary', projects: [] };
        }
    },
    { maxAge: 60, swr: true, name: 'realisations' },
);
