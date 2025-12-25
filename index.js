const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("auth")
  const sock = makeWASocket({ auth: state })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const text = msg.message.conversation?.toLowerCase()
    const jid = msg.key.remoteJid

    if (text === "list") {
      await sock.sendMessage(jid, {
        text: "📋 MENU\n1️⃣ Diamond MLBB\n2️⃣ Netflix Premium"
      })
    }

    if (text === "1") {
      await sock.sendMessage(jid, {
        text: "💎 DIAMOND MLBB\n86 = RM5\n172 = RM10"
      })
    }

    if (text === "2") {
      await sock.sendMessage(jid, {
        text: "🎬 NETFLIX PREMIUM\n1 Bulan = RM15"
      })
    }
  })
}

start()
