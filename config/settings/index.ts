export * from './theme.config'
export * from './color.config'

import { template as corporate } from './template.corporate.config'
import { template as executive } from './template.executive.config'
import { template as mobile } from './template.mobile.config'

const templates = {
	corporate,
	executive,
	mobile,
}

export { templates }
