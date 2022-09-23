import dcmjs from 'dcmjs'
import fs from 'fs'
import { EOL } from 'os';
import { VR } from './vr';
import options from './options'

interface RawDcmjsDictionaryItem { vr: 'string', name: 'string', version: string }
interface ExtendedDcmjsDictionaryItem extends RawDcmjsDictionaryItem {
    options?: (string | number)[]
}
interface ExtendedDcmjsDictionary {
    [key: string]: ExtendedDcmjsDictionaryItem
}

export default class DcmjsDictionary {
    private data: ExtendedDcmjsDictionary = {}

    private vr = new VR()

    constructor() {
        this.data = dcmjs.data.DicomMetaDictionary.dictionary
        Object.keys(this.data).forEach(k => {
            let op = options[this.data[k].name]
            if (op) {
                this.data[k].options = op
            }
        })
    }

    getData() {
        return this.data
    }

    getNaturalizedData() {
        const ret: ExtendedDcmjsDictionary = {}
        Object.keys(this.data).forEach(k => {
            let item = this.data[k];
            if (item && item.name && (item.version !== 'PrivateTag')) {
                ret[item.name] = item
            }
        })
        return ret
    }

    createDTS(fileName?: string): string {
        try {
            const
                data = this.getNaturalizedData(),
                arr: string[] = [];

            arr.push(this.vr.createDTS())
            arr.push(`export interface DatasetElements{`)
            Object.keys(data).forEach(k => {
                const item = data[k]
                if (k.startsWith('RETIRED_')) {
                    arr.push(`//* @deprecated */`)
                }
                let type
                if (data[k].options) {
                    type = data[k].options.map(v => ('string' === typeof v) ? `"${v}"` : v).join('|')
                } else {
                    type = this.vr.getTypeof(item.vr)
                }
                arr.push(`  ${k}?: ${type}, //${item.vr}`)
            })
            arr.push('}')
            const text = arr.join(EOL)
            fileName && fs.writeFileSync(fileName, text)
            return text
        } catch (e) {
            throw ('Unable to create .d.ts file: ' + e)
        }
    }
}
