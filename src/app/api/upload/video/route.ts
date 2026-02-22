import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('video') as File;

        if (!file) {
            return NextResponse.json(
                { message: 'No video uploaded' },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + '-' + file.name;
        const filepath = path.join(process.cwd(), 'public/uploads/videos', filename);

        await mkdir(path.dirname(filepath), { recursive: true });
        await writeFile(filepath, buffer);

        return NextResponse.json({
            message: 'Video uploaded successfully',
            filename,
            url: `/uploads/videos/${filename}`,
        });
    } catch (error) {
        console.error('Video upload error:', error);
        return NextResponse.json(
            { message: 'Upload failed' },
            { status: 500 }
        );
    }
}
