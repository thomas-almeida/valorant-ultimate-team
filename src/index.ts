import axios from 'axios'

interface UserInterface {
    name: string,
    overall: number,
    agentImage: string
    actRank: string,
    ACS: number,
    KAST: number,
    RW: number,
    DDA: number,
}

async function getData(riotUser: string) {
    const encodedRiotUser = encodeURIComponent(riotUser)
    const response = await axios.get(`https://api.tracker.gg/api/v2/valorant/standard/profile/riot/${encodedRiotUser}`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        }
    }
    )

    const user = JSON.parse(JSON.stringify(response.data))
    const userObject = user.data.segments[0]

    let name = user.data.platformInfo.platformUserHandle
    let index = name.indexOf('#')
    name = name.substring(0, index)

    const userPayload: UserInterface = {
        name: name,
        overall: Math.round(((userObject.stats.trnPerformanceScore.value / 1000) * 100)),
        actRank: userObject.stats.rank.metadata.tierName,
        ACS: userObject.stats.scorePerRound.displayValue,
        KAST: userObject.stats.kAST.value,
        RW: userObject.stats.roundsWinPct.displayValue,
        DDA: Math.round(userObject.stats.damageDeltaPerRound.value),
        agentImage: user.data.segments[3].metadata.imageUrl
    }

    console.log(userPayload)
}

getData('atbjao#atb11')