import ytdl from 'ytdl-core'
import fs from 'fs'
import { info } from 'console'

export const download = (videoId) => new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/watch?v=" + videoId
    console.log("Realizando o download do vídeo:", + videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
        .on("info", (info) => {
            const seconds = info.formats[0].approuxDurationsMs / 1000

            if (seconds > 60) {
                throw new Error("A duração desse vídeo é maior do que 60 segundos.")
            }
        }).on("end", () => {
            console.log("Download do vídeo finalizado.")
            resolve()
        })
        .on("error", (error) => {
            console.log(
                "Não foi possivel fazer o download do vídeo. Detalhes do error:", error
            )
            reject(error)
    }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
