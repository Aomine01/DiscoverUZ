import { optimize } from 'svgo';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const svgFiles = [
    { input: 'public/discoveruzlogo.svg', output: 'public/discoveruzlogo.optimized.svg' },
    { input: 'public/logo.svg', output: 'public/logo.optimized.svg' }
];

const svgoConfig = {
    multipass: true,
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    // Keep viewBox for responsive scaling
                    removeViewBox: false,
                    // Clean up IDs but don't remove them entirely
                    cleanupIds: true,
                },
            },
        },
        // Remove unnecessary metadata
        'removeMetadata',
        // Remove comments
        'removeComments',
        // Remove hidden elements
        'removeHiddenElems',
        // Remove empty attributes
        'removeEmptyAttrs',
        // Remove empty containers
        'removeEmptyContainers',
        // Minify styles
        'minifyStyles',
        // Round numbers to reduce file size
        {
            name: 'cleanupNumericValues',
            params: {
                floatPrecision: 2,
            },
        },
    ],
};

async function optimizeSvg(inputPath, outputPath) {
    console.log(`\n🔄 Optimizing ${inputPath}...`);

    try {
        // Read the SVG file
        const svgString = await readFile(inputPath, 'utf-8');
        const originalSize = Buffer.byteLength(svgString, 'utf-8');

        // Optimize
        const result = optimize(svgString, svgoConfig);
        const optimizedSize = Buffer.byteLength(result.data, 'utf-8');

        // Write optimized version
        await writeFile(outputPath, result.data, 'utf-8');

        const savedBytes = originalSize - optimizedSize;
        const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

        console.log(`   Original size: ${(originalSize / 1024).toFixed(2)} KB`);
        console.log(`   Optimized size: ${(optimizedSize / 1024).toFixed(2)} KB`);
        console.log(`   ✅ Saved: ${(savedBytes / 1024).toFixed(2)} KB (${savedPercent}%)`);

    } catch (error) {
        console.error(`   ❌ Error optimizing ${inputPath}:`, error.message);
    }
}

async function main() {
    console.log('🚀 Starting SVG optimization...\n');
    console.log('━'.repeat(60));

    for (const { input, output } of svgFiles) {
        await optimizeSvg(input, output);
    }

    console.log('\n' + '━'.repeat(60));
    console.log('\n✨ SVG optimization complete!\n');
    console.log('Note: Review the optimized SVGs and replace the originals if satisfied.');
}

main().catch(console.error);
