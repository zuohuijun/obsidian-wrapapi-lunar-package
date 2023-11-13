import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import {Lunar} from 'lunar-typescript'

interface WrapapiPluginSettings {
	WrapapiPluginSetting: string;
	bShowLunarInStautsbar: boolean;
}

const DEFAULT_SETTINGS: WrapapiPluginSettings = {
	WrapapiPluginSetting: 'default',
	bShowLunarInStautsbar: true
}

export class LunarApi {
	constructor(private plugin: WrapapiPlugin){

	}
    
	public LunarToday(b:boolean = false){
		const lunar = Lunar.fromDate(new Date());
		if (!b) {
			return lunar.toString();
		}else{
			return lunar.toFullString();
		}
	}

	public LunarFromDate(date:Date){
		const lunar = Lunar.fromDate(date);
		return lunar.toString();
	}
}

export default class WrapapiPlugin extends Plugin {
	settings: WrapapiPluginSettings;
	public lunarApi: LunarApi;

	async onload() {
		await this.loadSettings();
		this.lunarApi = new LunarApi(this);

		// This creates an icon in the left ribbon.
		// const ribbonIconEl = this.addRibbonIcon('dice', 'Wrapapi Plugin', (evt: MouseEvent) => {
		// 	// Called when the user clicks the icon.
		// 	new Notice('This is a notice!');
		// });
		// Perform additional things with the ribbon
		// ribbonIconEl.addClass('Wrapapi-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		if (this.settings.bShowLunarInStautsbar){
			const statusBarItemEl = this.addStatusBarItem();
			statusBarItemEl.setText(this.lunarApi.LunarToday());
		}

		// This adds a simple command that can be triggered anywhere
		// this.addCommand({
		// 	id: 'open-sample-modal-simple',
		// 	name: 'Open sample modal (simple)',
		// 	callback: () => {
		// 		new SampleModal(this.app).open();
		// 	}
		// });
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'InsertLunarToday',
			name: 'Insert Lunar String',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection(this.lunarApi.LunarToday(true));
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		// this.addCommand({
		// 	id: 'open-sample-modal-complex',
		// 	name: 'Open sample modal (complex)',
		// 	checkCallback: (checking: boolean) => {
		// 		// Conditions to check
		// 		const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
		// 		if (markdownView) {
		// 			// If checking is true, we're simply "checking" if the command can be run.
		// 			// If checking is false, then we want to actually perform the operation.
		// 			if (!checking) {
		// 				new SampleModal(this.app).open();
		// 			}

		// 			// This command will only show up in Command Palette when the check function returns true
		// 			return true;
		// 		}
		// 	}
		// });

		// This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new SampleSettingTab(this.app, this));

		// // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// // Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		// // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

// class SampleModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}

// 	onOpen() {
// 		const {contentEl} = this;
// 		contentEl.setText('Woah!');
// 	}

// 	onClose() {
// 		const {contentEl} = this;
// 		contentEl.empty();
// 	}
// }

// class SampleSettingTab extends PluginSettingTab {
// 	plugin: WrapapiPlugin;

// 	constructor(app: App, plugin: WrapapiPlugin) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		const {containerEl} = this;

// 		containerEl.empty();

// 		new Setting(containerEl)
// 			.setName('Wrapapi Setting #1')
// 			.setDesc('It\'s a secret')
// 			.addText(text => text
// 				.setPlaceholder('Enter your secret')
// 				.setValue(this.plugin.settings.WrapapiPluginSetting)
// 				.onChange(async (value) => {
// 					this.plugin.settings.WrapapiPluginSetting = value;
// 					await this.plugin.saveSettings();
// 				}));
// 	}
// }
