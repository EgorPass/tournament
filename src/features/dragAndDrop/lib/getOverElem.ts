

export const getOverElem = <T extends { id: string } > (list: T[], dropZone_id: string): T | undefined => list.find( it => it.id === dropZone_id ) 