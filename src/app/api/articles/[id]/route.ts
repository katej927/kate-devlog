import { NextRequest, NextResponse } from 'next/server'

import connectMongoDB from '@/src/libs/mongodb'
import Article from '@/src/models/topic'

export async function PUT(
  request: NextRequest,
  {
    params: { id },
  }: {
    params: { id: string }
  },
) {
  const { newTitle: title, newContent: content } = await request.json()
  await connectMongoDB()
  await Article.findByIdAndUpdate(id, { title, content })
  return NextResponse.json({ message: 'Article updated' }, { status: 200 })
}

export async function GET(
  request: NextRequest,
  {
    params: { id },
  }: {
    params: { id: string }
  },
) {
  await connectMongoDB()
  const article = await Article.findOne({ _id: id })
  return NextResponse.json({ article }, { status: 200 })
}
