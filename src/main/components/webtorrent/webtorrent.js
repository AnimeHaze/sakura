import WebTorrent from 'webtorrent'
import portfinder from 'portfinder'

const d = require('debug')('torrent-client')

export class Torrent {
  constructor () {
    this._client = new WebTorrent()
  }

  /**
   * Add torrent
   * @param {Buffer|string|object} torrent Add torrent by buffer or magnet url
   */
  add (torrent = 'magnet:?xt=urn:btih:0fb23bbac94bf101f9bd165db7f5ee8ed9ec479d&dn=Tensei+shitara+Slime+Datta+Ken+3rd+Season+-+AniLibria.TV+%5BWEBRip+1080p%5D&xl=5994692509&tr=http://tr.libria.fun:2710/announce') {
    this._client.add(torrent, /*{ path: 'E:\\hh' },*/ function (torrent) {
      // Got torrent metadata!
      console.log('Client is downloading:', torrent.infoHash, torrent.path)

      for (const file of torrent.files) {
        console.log(file.name)
      }

      // visit http://localhost:<port>/ to see a list of files

      // access individual files at http://localhost:<port>/<index> where index is the index
      // in the torrent.files array
    })
  }

  async init () {
    d.enabled = true
    d('init')

    const port = await portfinder.getPortPromise()

    this._server = this._client.createServer()
    this._server.listen(port)
    d(`webtorrent server is running on port ${port}`)
  }

  async dispose () {
    d('dispose')

    this._server.close()
    d('webtorrent server is closed')
    this._client.destroy()
    d('webtorrent client is destroyed')
  }
}
