class AdminController < ApplicationController
  before_filter :set_layout
  before_filter :set_admin, only: [:show,:edit,:update,:destroy]

  def index
    @admins = Admin.all
    @admin = Admin.new
  end

  def new
    @admin = Admin.new
  end

  def create
    # return render json: admin_params
    @admin = Admin.new(admin_params)
    if @admin.save
      NotificationMailer.new_user_notification(admin_params).deliver
      redirect_to admin_index_url, notice: 'Writer created successfully.'
    else
      redirect_back(fallback_location: :back,alert: "Email already exists")
    end
  end

  def show
  end

  def edit
  end

  def update
    if @admin.update(admin_params)
      unless current_admin.super_admin? && current_admin != @admin
        sign_in(@admin, :bypass => true)
      end
      redirect_back(fallback_location: :back,notice: "User information updated")
    else
      redirect_back(fallback_location: :back,alert: "User Could not be updated")
    end
  end

  def destroy
    @admin.delete
    redirect_to admin_index_url, alert: "Requested user has been deleted"
  end

  def account
    @admin = Admin.find(current_admin.id)
  end

  private

  def admin_params
    admin_params = params.require(:admin).permit(:name,:last_name,:email,:password,:password_confirmation)
    admin_params.delete(:password) unless admin_params[:password].present?
    admin_params.delete(:password_confirmation) unless admin_params[:password_confirmation].present?
    admin_params
  end

  def set_layout
    self.class.layout "dashboard"
  end

  def set_admin
    @admin = Admin.find(params[:id])
  end

end
