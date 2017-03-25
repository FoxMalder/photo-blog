<?php

namespace Api\V1\Http\Controllers;

use Api\V1\Http\Requests\CreateSubscriptionRequest;
use Core\DataProviders\Subscription\Contracts\SubscriptionDataProvider;
use Core\Models\Subscription;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;

/**
 * Class SubscriptionsController.
 *
 * @property SubscriptionDataProvider subscriptionDataProvider
 * @package Api\V1\Http\Controllers
 */
class SubscriptionsController extends ResourceController
{
    /**
     * SubscriptionController constructor.
     *
     * @param Request $request
     * @param Guard $guard
     * @param string $presenterClass
     * @param SubscriptionDataProvider $subscriptionDataProvider
     */
    public function __construct(
        Request $request,
        Guard $guard,
        string $presenterClass,
        SubscriptionDataProvider $subscriptionDataProvider
    )
    {
        parent::__construct($request, $guard, $presenterClass);

        $this->subscriptionDataProvider = $subscriptionDataProvider;
    }

    /**
     * @apiVersion 1.0.0
     * @api {post} /v1/subscription Create
     * @apiName Create
     * @apiGroup Subscriptions
     * @apiHeader {String} Accept application/json
     * @apiHeader {String} Content-Type application/json
     * @apiParam {String{1..255}} email Subscriber email address.
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 201 Created
     * {
     *     "email": "username@mail.address",
     *     "token": "subscription_token_string"
     * }
     */

    /**
     * Create a subscription.
     *
     * @param CreateSubscriptionRequest $request
     * @return Subscription
     */
    public function create(CreateSubscriptionRequest $request) : Subscription
    {
        $subscription = new Subscription;

        $subscription->generateToken();

        $this->subscriptionDataProvider->save($subscription, $request->all());

        return $subscription;
    }

    /**
     * @apiVersion 1.0.0
     * @api {delete} /v1/subscriptions/:token Delete
     * @apiName Delete
     * @apiGroup Subscriptions
     * @apiHeader {String} Accept application/json
     * @apiParam {String{1..255}} :token Subscription token.
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 204 No Content
     */

    /**
     * Delete a subscription.
     *
     * @param Subscription $subscription
     * @return void
     */
    public function delete(Subscription $subscription)
    {
        $this->subscriptionDataProvider->delete($subscription);
    }
}
