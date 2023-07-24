import { config } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { sendTransaction } from './sendTransaction.js'
import { waitForTransactionReceipt } from './waitForTransactionReceipt.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { hash } = await sendTransaction(config, {
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })

  await expect(
    waitForTransactionReceipt(config, { hash }),
  ).resolves.toMatchObject({
    transactionHash: hash,
  })

  await disconnect(config, { connector })
})