const roles = {
    admin: 0,
    superagent: 1,
    agent: 2,
    cashier: 3,
    player: 4
}

type roleType = "admin" | "superagent" | "agent" | "cashier" | "player"

export const checkRole = (role: number, label: roleType) => {
    if (role < roles[label]) {
        return true
    }
    return false
}

