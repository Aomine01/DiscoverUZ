import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

const INPUT_DIR = 'public/images';
const OUTPUT_DIR = 'public/images/optimized';

// Responsive image widths to generate
const WIDTHS = [640, 750, 828, 1080, 1200, 1920];

async function convertImage(inputPath, filename) {
    const { name, ext } = parse(filename);

    // Skip if already a webp file
    if (ext === '.webp') {
        console.log(`⏭️  Skipping ${filename} (already WebP)`);
        return;
    }

    // Only convert images (png, jpg, jpeg)
    if (!['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) {
        console.log(`⏭️  Skipping ${filename} (not an image)`);
        return;
    }

    console.log(`\n🔄 Converting ${filename}...`);

    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        console.log(`   Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);

        // Generate responsive sizes
        for (const width of WIDTHS) {
            // Skip if the target width is larger than the original
            if (width > metadata.width) continue;

            const outputPath = join(OUTPUT_DIR, `${name}-${width}w.webp`);

            await sharp(inputPath)
                .resize(width, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .webp({ quality: 85, effort: 6 })
                .toFile(outputPath);

            const stats = await sharp(outputPath).metadata();
            console.log(`   ✅ Generated ${width}w: ${stats.size} bytes`);
        }

        // Also create a full-size WebP version
        const fullSizePath = join(OUTPUT_DIR, `${name}.webp`);
        await sharp(inputPath)
            .webp({ quality: 85, effort: 6 })
            .toFile(fullSizePath);

        const fullStats = await sharp(fullSizePath).metadata();
        console.log(`   ✅ Generated full-size WebP: ${fullStats.size} bytes`);

    } catch (error) {
        console.error(`   ❌ Error converting ${filename}:`, error.message);
    }
}

async function main() {
    console.log('🚀 Starting image optimization...\n');

    // Create output directory if it doesn't exist
    if (!existsSync(OUTPUT_DIR)) {
        await mkdir(OUTPUT_DIR, { recursive: true });
        console.log(`📁 Created output directory: ${OUTPUT_DIR}\n`);
    }

    // Read all files in the input directory
    const files = await readdir(INPUT_DIR);

    // Filter for image files
    const imageFiles = files.filter(file => {
        const ext = parse(file).ext.toLowerCase();
        return ['.png', '.jpg', '.jpeg'].includes(ext);
    });

    console.log(`Found ${imageFiles.length} images to convert\n`);
    console.log('━'.repeat(60));

    // Convert each image
    for (const file of imageFiles) {
        const inputPath = join(INPUT_DIR, file);
        await convertImage(inputPath, file);
    }

    console.log('\n' + '━'.repeat(60));
    console.log('\n✨ Image optimization complete!\n');
    console.log(`Check the optimized images in: ${OUTPUT_DIR}`);
}

main().catch(console.error);
