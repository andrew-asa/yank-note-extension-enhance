import { registerPlugin } from '@yank-note/runtime-api'

const extensionName = __EXTENSION_ID__

// const settingKeySmgPath = 'plugin.sublime-merge.smg-path'

registerPlugin({
  name: extensionName,
  register (ctx) {
    const i18n = ctx.i18n.createI18n({
      en: {
        'asa-enhance-create-txt': 'create txt',
      },
      'zh-CN': {
        'asa-enhance-create-txt': '生成TXT文件',
      }
    })

    // ctx.setting.changeSchema(schema => {
    //   if (!schema.groups.some((x: any) => x.value === 'plugin')) {
    //     schema.groups.push({ value: 'plugin', label: 'Plugin' } as any)
    //   }
    //
    //   schema.properties[settingKeySmgPath] = {
    //     title: i18n.$$t('smerge-command-path'),
    //     type: 'string',
    //     defaultValue: 'smerge',
    //     group: 'plugin',
    //     required: true,
    //   }
    // })

    ctx.tree.tapContextMenus((items, node) => {
      const createTxt = () => {
        const currentRepo = ctx.store.state.currentRepo
        const path = currentRepo ? ctx.utils.path.join(currentRepo.path, node.path) : ''
        console.log(path)
      }
      // const openInSublimeMerge = () => {
      //   const currentRepo = ctx.store.state.currentRepo
      //   const path = currentRepo ? ctx.utils.path.join(currentRepo.path, node.path) : ''
      //   if (path && currentRepo) {
      //     const smgPath = ctx.setting.getSetting(settingKeySmgPath, 'smerge')
      //
      //     const args = [ctx.utils.quote(path)]
      //
      //     if (node.type === 'file') {
      //       args.unshift('`log`')
      //     }
      //
      //     ctx.api.rpc(`return require('util').promisify(require('child_process').execFile)(
      //       ${ctx.utils.quote(smgPath)},
      //       [${args.join(',')}],
      //       {
      //         cwd: ${ctx.utils.quote(currentRepo.path)},
      //       }
      //     )`).catch((e: any) => {
      //       ctx.ui.useToast().show('warning', e.message)
      //       ctx.setting.showSettingPanel('plugin')
      //     })
      //   }
      // }

      if (node.type === 'dir' || node.path === '/') {
        items.push(
          { type: 'separator' },
          {
            id: extensionName + '-asa-enhance-create-txt',
            label: i18n.t('asa-enhance-create-txt'),
            onClick: createTxt
          }
        )
      }
      return items
    })
  }
})
