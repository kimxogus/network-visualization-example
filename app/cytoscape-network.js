/**
 * Created by Taehyun on 2016-09-23.
 */
import './common'

import cytoscape from 'cytoscape'
import 'cytoscape-qtip'
import panzoom from 'cytoscape-panzoom'
import forcelayout from 'cytoscape-ngraph.forcelayout'

import genData from './data'


panzoom(cytoscape);
forcelayout(cytoscape);