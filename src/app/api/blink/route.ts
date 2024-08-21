import { ActionGetResponse, ActionPostRequest, ACTIONS_CORS_HEADERS, createPostResponse } from '@solana/actions'
import {
  Connection,
  ComputeBudgetProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js'
import { NextRequest, NextResponse } from 'next/server'

// Allow RPC API direct value or use helius
const RPC = process.env.RPC_API_ENDPOINT || `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`

export const GET = (req: NextRequest) => {

  const payload: ActionGetResponse = {
    icon: process.env.NEXT_PUBLIC_SITE_URL+'/tipjar.png',
    label: 'Tip  Me Please',
    description: 'This will pay for my life. Please let me live. I want to live.',
    title: 'Tip Me Please',
    links: {
      actions: [
        {
          label: '.25 SOL',
          href: '/api/blink?amount=.25',
        },
        {
          label: '.5 SOL',
          href: '/api/blink?amount=.5',
        },
        {
          label: '1 SOL',
          href: '/api/blink?amount=1',
        },
        {
          label: 'Any Amount',
          href: '/api/blink?amount={amount}',
          parameters: [
            {
              name: 'amount',
              label: 'Enter a custom SOL amount',
            },
          ],
        },
      ]
    },
  }
  return NextResponse.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  })
}

export const OPTIONS = GET

export const POST = async (req: NextRequest, { params }: { params: { projectId: string } }) => {

  try {
    const body: ActionPostRequest = await req.json()
    const { searchParams } = new URL(req.url)

    let account: PublicKey
    let amount: number
    try {
      account = new PublicKey(body.account)
      amount = Number(searchParams.get('amount') || 1)
    } catch (e) {
      console.log('e', e)
      return NextResponse.json('Invalid account provided', { status: 400, headers: ACTIONS_CORS_HEADERS })
    }

    const transaction = new Transaction()
    account = new PublicKey(body.account)
    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 15000 }),
      ComputeBudgetProgram.setComputeUnitLimit({ units: 50000 }),
      SystemProgram.transfer({
        fromPubkey: account,
        toPubkey: new PublicKey(process?.env?.OWNER_WALLET || 'BLiNK8NPB6nW3rFbuZDXhKyfYqqWRvVjk8utTnsPupY5'),
        lamports: Math.floor(amount * LAMPORTS_PER_SOL),
      }),
    )

    transaction.feePayer = account

    // Use config RPC (maybe customers?) or fallback PRC (ours)
    const connection = new Connection(RPC)
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
    const payload = await createPostResponse({ fields: { transaction } })

    return NextResponse.json(payload, { headers: ACTIONS_CORS_HEADERS })
  } catch (e) {
    console.log('e', e)
    return NextResponse.json('An unknown error occurred', { status: 400 })
  }
}
