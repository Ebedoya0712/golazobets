<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Database\Factories\AccountFactory;


class DemoRoutesTest extends TestCase
{
	use RefreshDatabase;

	protected $user;

	/**
	 * Set up the test environment
	 *
	 * Create a user with roles and permissions
	 */
	protected function setUp(): void
	{
		parent::setUp();

		// Create a user
		$this->user = User::factory()->create();
		Role::create(['name' => 'User']);
		$this->user->assignRole('User');
		AccountFactory::new()->create(['user_id' => $this->user->id]);
	}

	// Accordion
	public function test_ui_accordion_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'accordion', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'accordion');
	}
	// Alerts
	public function test_ui_alerts_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'alerts', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'alerts');
	}
	// Avatar
	public function test_ui_avatar_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'avatar', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'avatar');
	}
	// Breadcrumbs
	public function test_ui_breadcrumb_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'breadcrumbs', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'breadcrumbs');
	}
	// Buttons
	public function test_ui_buttons_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'buttons', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'buttons');
	}
	// Cards
	public function test_ui_cards_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'cards', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'cards');
	}
	// Chips
	public function test_ui_chips_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'chips', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'chips');
	}
	// Drawer
	public function test_ui_drawer_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'drawer', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'drawer');
	}
	// Dropdown
	public function test_ui_dropdown_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'dropdown', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'dropdown');
	}
	// Image
	public function test_ui_image_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'image', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'image');
	}
	// Listbox
	public function test_ui_listbox_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'listbox', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'listbox');
	}
	// Loading
	public function test_ui_loading_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'loading', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'loading');
	}
	// Modal
	public function test_ui_modal_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'modal', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'modal');
	}
	// Pagination
	public function test_ui_pagination_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'pagination', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'pagination');
	}
	// Popover
	public function test_ui_popover_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'popover', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'popover');
	}
	// Progress
	public function test_ui_progress_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'progress', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'progress');
	}
	// Tabs
	public function test_ui_tabs_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'tabs', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'tabs');
	}
	// Toasts
	public function test_ui_toasts_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'toasts', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'toasts');
	}
	// Tooltips
	public function test_ui_tooltips_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('ui', 'tooltips', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('ui', 'tooltips');
	}
	// Input
	public function test_form_input_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('form', 'input', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('form', 'input');
	}
	// Select
	public function test_form_select_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('form', 'select', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('form', 'select');
	}
	// Textarea
	public function test_form_textarea_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('form', 'textarea', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('form', 'textarea');
	}
	// Checkbox
	public function test_form_checkbox_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('form', 'checkbox', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('form', 'checkbox');
	}
	// Radio Button
	public function test_form_radio_button_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('form', 'radio', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('form', 'radio');
	}
	// Switch
	public function test_form_switch_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('form', 'switch', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('form', 'switch');
	}
	// Slider
	public function test_form_slider_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('form', 'slider', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('form', 'slider');
	}
	// Date Picker
	public function test_form_date_picker_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('form', 'datepicker', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('form', 'datepicker');
	}
	// WYSIWYG
	public function test_form_wysiwyg_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('form', 'wysiwyg', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('form', 'wysiwyg');
	}
	// Color
	public function test_utilities_color_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('utilities', 'color', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('utilities', 'color');
	}
	// Image uploader
	public function test_utilities_image_uploader_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('utilities', 'image-uploader', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('utilities', 'image-uploader');
	}
	// Icons
	public function test_utilities_icons_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('utilities', 'icons', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('utilities', 'icons');
	}
	// Charts
	public function test_apex_charts_screen_can_be_rendered(): void
	{
		$this->assertScreenRequiresAuth('charts', 'apexcharts', 302);
		$this->assertScreenCanBeAccessedByAuthenticatedUser('charts', 'apexcharts');
	}


	private function assertScreenRequiresAuth(string $group, string $screen, int $statuscode)
	{
		$response = $this->get("/dashboard/{$group}/{$screen}");
		$response->assertStatus($statuscode);
		$response->assertRedirect(route('login'));
	}

	private function assertScreenCanBeAccessedByAuthenticatedUser(string $group, string $screen): void
	{
		$this->post(route('login.store'), ['login' => $this->user->username, 'password' => 'password']);
		$response = $this->get("/dashboard/{$group}/{$screen}");
		$response->assertStatus(200);
	}
}
